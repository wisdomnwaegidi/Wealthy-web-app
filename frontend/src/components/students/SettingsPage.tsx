import { useState } from "react";
import { Switch } from "@/ui/Switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/Tabs";
import { Card, CardContent } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
// import { Avatar, AvatarFallback } from "@/ui/Avatar" User, Bell, Shield, LogOut ;
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className='min-h-screen dark:bg-gray-900 p-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Sidebar */}
        {/*  <div className='col-span-1'>
          <Card className='p-4 space-y-4'>
            <div className='flex items-center gap-3'>
              <Avatar>
                <AvatarFallback>WN</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-semibold'>Wisdom N.</p>
                <p className='text-sm text-gray-500'>wisdom@email.com</p>
              </div>
            </div>

            <div className='space-y-2'>
              <SidebarItem icon={<User size={18} />} label='Profile' />
              <SidebarItem icon={<Bell size={18} />} label='Notifications' />
              <SidebarItem icon={<Shield size={18} />} label='Security' />
            </div>

            <Button variant='destructive' className='w-full flex gap-2'>
              <LogOut size={16} /> Logout
            </Button>
          </Card>
        </div> */}

        {/* Main Content */}
        <div className='col-span-1 md:col-span-3'>
          <Tabs defaultValue='profile'>
            <TabsList className='mb-4'>
              <TabsTrigger value='profile'>Profile</TabsTrigger>
              <TabsTrigger value='appearance'>Appearance</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              <TabsTrigger value='security'>Security</TabsTrigger>
            </TabsList>

            {/* Profile */}
            <TabsContent value='profile'>
              <Card>
                <CardContent className='space-y-4 p-6'>
                  <h2 className='text-xl font-semibold'>Profile Settings</h2>
                  <Input placeholder='Full Name' />
                  <Input placeholder='Email' />
                  <Button className='p-4'>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance */}
            <TabsContent value='appearance'>
              <Card>
                <CardContent className='p-6 space-y-4'>
                  <h2 className='text-xl font-semibold'>Appearance</h2>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                      <span>Dark Mode</span>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value='notifications'>
              <Card>
                <CardContent className='p-6 space-y-4'>
                  <h2 className='text-xl font-semibold'>Notifications</h2>
                  <div className='flex items-center justify-between'>
                    <span>Email Notifications</span>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value='security'>
              <Card>
                <CardContent className='p-6 space-y-4'>
                  <h2 className='text-xl font-semibold'>Security</h2>
                  <Input type='password' placeholder='New Password' />
                  <Input type='password' placeholder='Confirm Password' />
                  <Button className="p-4">Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

/* function SidebarItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'>
      {icon}
      <span>{label}</span>
    </div>
  );
} */
