import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

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
    <div className="min-h-screen bg-background py-6 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Your Profile</h1>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              {/* Avatar */}
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback className="text-3xl md:text-4xl">
                  <User className="h-12 w-12 md:h-16 md:w-16" />
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 w-full space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <label className="text-sm text-muted-foreground">Username:</label>
                    <p className="text-xl md:text-2xl font-semibold break-words">{user.username}</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <label className="text-sm text-muted-foreground">User ID:</label>
                    <p className="font-mono text-xs md:text-sm text-muted-foreground break-all">{user.id}</p>
                  </div>
                </div>

                <div className="text-center sm:text-left">
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
