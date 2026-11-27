'use server';

import { z } from 'zod';
import { addMeeting, updateMeeting as dbUpdateMeeting, deleteMeeting as dbDeleteMeeting } from './meetings-db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  meetingType: z.string().min(1, 'Meeting type is required'),
  presiding: z.string().min(1, 'Presiding leader is required'),
  conducting: z.string().min(1, 'Conducting leader is required'),
  openingPrayer: z.string().min(1, 'Opening prayer is required'),
  closingPrayer: z.string().min(1, 'Closing prayer is required'),
  openingHymnNumber: z.coerce.number().min(1, 'Opening hymn number is required'),
  openingHymnTitle: z.string().min(1, 'Opening hymn title is required'),
  sacramentHymnNumber: z.coerce.number().min(1, 'Sacrament hymn number is required'),
  sacramentHymnTitle: z.string().min(1, 'Sacrament hymn title is required'),
  closingHymnNumber: z.coerce.number().min(1, 'Closing hymn number is required'),
  closingHymnTitle: z.string().min(1, 'Closing hymn title is required'),
  announcements: z.string().optional(),
  wardBusiness: z.string().optional(),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingPrayer?: string[];
    closingPrayer?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
  };
  message?: string | null;
};

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingPrayer: formData.get('openingPrayer'),
    closingPrayer: formData.get('closingPrayer'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    announcements: formData.get('announcements'),
    wardBusiness: formData.get('wardBusiness'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Meeting.',
    };
  }

  const data = validatedFields.data;

  try {
    const announcements = data.announcements 
      ? data.announcements.split('\n').map(s => s.trim()).filter(Boolean)
      : [];
    const wardBusiness = data.wardBusiness 
      ? data.wardBusiness.split('\n').map(s => ({ description: s.trim() })).filter(b => b.description)
      : [];

    await addMeeting({
      date: data.date,
      meetingType: data.meetingType as any,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements,
      openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
      openingPrayer: data.openingPrayer,
      wardBusiness,
      stakeBusiness: false,
      sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
      speakers: [],
      closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Meeting.',
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(id: number, prevState: State, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingPrayer: formData.get('openingPrayer'),
    closingPrayer: formData.get('closingPrayer'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    announcements: formData.get('announcements'),
    wardBusiness: formData.get('wardBusiness'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Meeting.',
    };
  }

  const data = validatedFields.data;

  try {
    const announcements = data.announcements 
      ? data.announcements.split('\n').map(s => s.trim()).filter(Boolean)
      : [];
    const wardBusiness = data.wardBusiness 
      ? data.wardBusiness.split('\n').map(s => ({ description: s.trim() })).filter(b => b.description)
      : [];

    await dbUpdateMeeting(id, {
      date: data.date,
      meetingType: data.meetingType as any,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements,
      openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
      openingPrayer: data.openingPrayer,
      wardBusiness,
      stakeBusiness: false,
      sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
      closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Update Meeting.',
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const idStr = formData.get('id');
  const id = Number(idStr);
  if (isNaN(id)) {
    throw new Error('Invalid meeting ID for deletion');
  }

  try {
    await dbDeleteMeeting(id);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error: Failed to Delete Meeting.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
