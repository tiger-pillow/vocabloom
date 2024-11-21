import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {

    const {username} = useAuth();


    return (
        <div>
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Welcome back, &nbsp; {username}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stats Cards */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-2">Current Streak</h2>
                        <p className="text-4xl font-bold text-blue-600">7 days</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-2">Cards Today</h2>
                        <p className="text-4xl font-bold text-green-600">25</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-2">Total Reviews</h2>
                        <p className="text-4xl font-bold text-purple-600">1,234</p>
                    </div>
                </div>

                {/* Friends Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Friends</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div className="ml-4">
                                    <p className="font-semibold">Sarah Chen</p>
                                    <p className="text-sm text-gray-600">12 day streak</p>
                                </div>
                            </div>
                            <span className="text-green-500">Online</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div className="ml-4">
                                    <p className="font-semibold">Mike Johnson</p>
                                    <p className="text-sm text-gray-600">5 day streak</p>
                                </div>
                            </div>
                            <span className="text-gray-500">Offline</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}