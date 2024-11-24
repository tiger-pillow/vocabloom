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

               
            </div>

        </div>
    )
}