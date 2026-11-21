import os

# Let's inspect app/api/meetings/route.ts
api_route_path = r'C:\Users\malco\OneDrive\Desktop\C430\week 2\app\api\meetings\route.ts'
if os.path.exists(api_route_path):
    with open(api_route_path, 'r', encoding='utf-8') as f:
        print('--- api/meetings/route.ts ---')
        print(f.read())