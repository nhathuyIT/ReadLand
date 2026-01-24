import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Shield } from "lucide-react";

const MyProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  const roleLabel = user.role === 0 ? "Admin" : "User";

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Your Profile</h1>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Avatar */}
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback className="text-4xl">
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-muted-foreground">Username:</label>
                    <p className="text-2xl font-semibold">{user.username}</p>
                  </div>
                  <div className="text-right">
                    <label className="text-sm text-muted-foreground">User ID:</label>
                    <p className="font-mono text-sm text-muted-foreground">{user.id}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">Role:</label>
                  <div className="mt-1">
                    <Badge 
                      variant={user.role === 0 ? "default" : "secondary"}
                      className={user.role === 0 ? "bg-red-600 text-white" : "text-white"}
                    >
                      {roleLabel}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;
