"user client"

import React from 'react';
import { useEffect } from 'react';

import { Home, Camera, User, X, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useSession } from "next-auth/react"
import { useUserStore, convertDynamoDBToRegular } from '@/store/userStore';
import { userAPI_helper } from '@/app/lib/userAPIHelper/helperFunctions';
import UserInfoPage from './user_info/page';
export default function Profile_tab() {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [showRefreshSuccess, setShowRefreshSuccess] = React.useState(false);
    const { data: session } = useSession() 
    const { userData, setUserData } = useUserStore();
    const [activeTab, setActiveTab] = React.useState('profile');
    const renderContent = () => {
        switch (activeTab) {
          case 'profile':
            return (
              <div className="p-4 pb-16">
                <div className="flex justify-end mb-2 items-center relative">
                  <div className={`absolute transition-opacity duration-200 ${showRefreshSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <p className="text-green-600 text-sm">✓ Updated</p>
                  </div>
                  
                  <div className={`transition-opacity duration-200 ${showRefreshSuccess ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600"
                      onClick={fetchUserData}
                      disabled={isRefreshing}
                    >
                      {isRefreshing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                          <span>Refreshing...</span>
                        </div>
                      ) : (
                        'Refresh'
                      )}
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                  <h2 className="font-medium text-xl mb-1 text-gray-900">{userData?.name}</h2>
                  <p className="text-gray-600 mb-4">Progress Stats</p>
                  <Button 
                    variant="outline" 
                    className="w-full mb-4"
                    onClick={() => setActiveTab('user-info')}
                  >
                    View User Information
                  </Button>
                </div>
              
                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">My Progress</h3>
                    <div className="space-y-2">
                      <div>Total Meals Tracked: 45</div>
                      <div>Average Daily Calories: 2100</div>
                      <div>Weekly Goal Progress: 80%</div>
                    </div>
                  </Card>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => signOut()}
                  className="mt-4 w-full"
                >
                  Sign Out
                </Button>
              </div>
            );
          //sub pages of profile tab
          case 'user-info':
            return <UserInfoPage onBack={() => setActiveTab('profile')} />;
          default:
            return null;
        }
      };
    // Effect to handle success message timing
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        if (showRefreshSuccess) {
        timeoutId = setTimeout(() => {
            setShowRefreshSuccess(false);
        }, 2000);
        }

        // Cleanup timeout when component unmounts or showRefreshSuccess changes
        return () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        };
    }, [showRefreshSuccess]);
    // Function to fetch user data
    const fetchUserData = async () => {
        if (!session?.user?.email) return;
        setIsRefreshing(true);
        try {
            const data = await userAPI_helper.fetchUser();
            if (data) {
            const convertedData = convertDynamoDBToRegular(data);
            setUserData(convertedData);
            }
            setIsRefreshing(false);
            setShowRefreshSuccess(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsRefreshing(false);
        } 
    };
    return (
        <div>
            {renderContent()}
        </div>
    );
}