import React, { useState } from 'react';

// Re-creating the necessary UI components for a single-file build
const Button = ({ children, className = '', variant = 'default', size = 'default', onClick }) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const variantClasses = {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  }[variant];
  const sizeClasses = {
    default: 'h-9 px-4 py-2',
    icon: 'h-9 w-9',
  }[size];

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className = '', variant = 'default' }) => {
  const variantClasses = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  }[variant];
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

const Avatar = ({ children, className = '' }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarFallback = ({ children, className = '' }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}>
    {children}
  </div>
);

const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-lg scale-100 opacity-100 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full">
        {children}
      </div>
    </div>
  );
};

const DialogTrigger = ({ children, asChild, onClick }) => {
  const child = React.Children.only(children);
  return React.cloneElement(child, { onClick: () => onClick(true) });
};

const DialogContent = ({ children }) => (
  <div className="space-y-4">
    {children}
  </div>
);

const DialogHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left">
    {children}
  </div>
);

const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-semibold leading-none tracking-tight">{children}</h3>
);

// Inline SVG Icons
const ArrowLeft = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>;
const Heart = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>;
const MapPin = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 18l-6-6 6-6 6 6z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const Star = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const Clock = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const Globe = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10a15.3 15.3 0 0 1-4 10a15.3 15.3 0 0 1-4-10a15.3 15.3 0 0 1 4-10z"></path></svg>;
const Award = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6"></circle><path d="M15.46 16.49l-2.68 2.37c-.38.33-.74.67-1.09 1.01s-1.07.97-1.42 1.3c-.35.34-.8.67-1.15 1.01"></path><path d="M8.54 16.49l2.68 2.37c.38.33.74.67 1.09 1.01s1.07.97 1.42 1.3c.35.34.8.67 1.15 1.01"></path></svg>;
const BookOpen = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const Target = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const Phone = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92V21a2 2 0 0 1-2 2h-2c-.52 0-1.03-.13-1.49-.38a16 16 0 0 1-9.98-9.98c-.25-.46-.38-.97-.38-1.49V4a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v6.5a1.5 1.5 0 0 1-1.5 1.5h-2c.4 2.8 2.6 5 5.4 5.4h2a1.5 1.5 0 0 1 1.5 1.5v3.5a2 2 0 0 1 2 2z"></path></svg>;
const Mail = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M22 6l-10 7L2 6"></path></svg>;
const Send = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2z"></path></svg>;

// Define the User interface based on usage in the provided code
// You may need to adjust this to match your actual data model
interface User {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  userType: 'tutor' | 'student';
  isOnline?: boolean;
  rating?: number;
  reviewCount?: number;
  hourlyRate?: number;
  bio?: string;
  subjects?: string[];
  preferredSubjects?: string[];
  educations?: { id: string; degree: string; institution: string; year: string; field?: string }[];
  teachingExperience?: string;
  yearsOfExperience?: number;
  availability?: (string | { dayOfWeek: string; startTime: string; endTime: string })[];
  grade?: string;
  learningGoals?: string;
  email: string;
  phone?: string;
}

interface ProfileDetailScreenProps {
  profile: User;
  currentUser: User;
  onNavigate: (screen: string, data?: any) => void;
  onMatch: (user: User) => void;
}

export function ProfileDetailScreen({ profile, currentUser, onNavigate, onMatch }: ProfileDetailScreenProps) {
  const [showContactDialog, setShowContactDialog] = useState(false);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleMatch = () => {
    onMatch(profile);
    onNavigate('home');
  };

  const formatAvailability = (availability) => {
    if (!availability || availability.length === 0) return [];

    // Handle both old string format and new object format
    if (typeof availability[0] === 'string') {
      return availability;
    }

    // Group by day and format time slots
    const grouped = {};
    availability.forEach(slot => {
      if (!grouped[slot.dayOfWeek]) {
        grouped[slot.dayOfWeek] = [];
      }
      const startTime = formatTime(slot.startTime);
      const endTime = formatTime(slot.endTime);
      grouped[slot.dayOfWeek].push(`${startTime}-${endTime}`);
    });

    return Object.entries(grouped).map(([day, times]) =>
      `${day}: ${times.join(', ')}`
    );
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes}${ampm}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('home')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold">Profile</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6">
          <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-t-lg">
            <Avatar className="w-24 h-24">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`${profile.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <AvatarFallback className="text-xl">
                  {getInitials(profile.name)}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-semibold mb-2">{profile.name}</h1>

              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
                {profile.userType === 'tutor' && profile.isOnline && (
                  <>
                    <Globe className="w-4 h-4" />
                    <span>Online Available</span>
                  </>
                )}
              </div>

              {profile.userType === 'tutor' && profile.rating && (
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{profile.rating}</span>
                  <span className="text-muted-foreground">
                    ({profile.reviewCount} reviews)
                  </span>
                </div>
              )}

              {profile.userType === 'tutor' && profile.hourlyRate && (
                <div className="text-2xl font-bold text-green-600 mb-4">
                  £{profile.hourlyRate}/hour
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-center">{profile.bio}</p>
          </CardContent>
        </Card>

        {/* Subjects/Interests */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {profile.userType === 'tutor' ? 'Subjects I Teach' : 'Subjects I Need Help With'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {(profile.subjects || profile.preferredSubjects || []).map(subject => (
                <Badge key={subject} variant="secondary">
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tutor Specific Sections */}
        {profile.userType === 'tutor' && (
          <>
            {/* Education */}
            {profile.educations && profile.educations.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Education
                  </h2>
                  <div className="space-y-3">
                    {profile.educations.map(education => (
                      <div key={education.id} className="border-l-2 border-primary pl-4">
                        <h4 className="font-medium">{education.degree}</h4>
                        <p className="text-sm text-muted-foreground">
                          {education.institution} • {education.year}
                        </p>
                        {education.field && (
                          <p className="text-sm text-muted-foreground">
                            {education.field}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Teaching Experience */}
            {(profile.teachingExperience || profile.yearsOfExperience) && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">Teaching Experience</h2>
                  {profile.yearsOfExperience && (
                    <div className="mb-3">
                      <Badge variant="secondary" className="text-sm">
                        {profile.yearsOfExperience} {profile.yearsOfExperience === 1 ? 'year' : 'years'} of experience
                      </Badge>
                    </div>
                  )}
                  {profile.teachingExperience && (
                    <p className="text-muted-foreground">{profile.teachingExperience}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Availability */}
            {profile.availability && profile.availability.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Availability
                  </h2>
                  <div className="space-y-2">
                    {formatAvailability(profile.availability).map((slot, index) => (
                      <div key={index} className="p-2 bg-muted rounded text-sm">
                        {slot}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Student Specific Sections */}
        {profile.userType === 'student' && (
          <>
            {/* Grade Level */}
            {profile.grade && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">Grade Level</h2>
                  <Badge variant="secondary" className="text-lg py-2 px-4">
                    {profile.grade}
                  </Badge>
                </CardContent>
              </Card>
            )}

            {/* Learning Goals */}
            {profile.learningGoals && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Learning Goals
                  </h2>
                  <p className="text-muted-foreground">{profile.learningGoals}</p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          {/* Primary Connect Button */}
          <Button
            className="w-full bg-red-500 hover:bg-red-600"
            onClick={() => onNavigate('connect')}
          >
            <Heart className="w-4 h-4 mr-2" />
            {currentUser.userType === 'tutor' ? 'Connect with Student' : 'Connect with Tutor'}
          </Button>

          {/* Contact Options */}
          <div className="flex gap-3">
            <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
              <DialogTrigger onClick={setShowContactDialog} asChild>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Info
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact Information</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Contact details are only shared after you connect with this {profile.userType}.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Email: {profile.email}</span>
                    </div>
                    {profile.phone && (
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Phone: {profile.phone}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setShowContactDialog(false)}
                  >
                    Got it
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onNavigate('home')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Mock Reviews for Tutors */}
        {profile.userType === 'tutor' && (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                <div className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1,2,3,4,5].map(i => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">2 weeks ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Excellent tutor! Really helped me understand calculus concepts that I was struggling with. Patient and explains things clearly."
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">- Alex M.</p>
                </div>

                <div className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1,2,3,4].map(i => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="text-sm text-muted-foreground">1 month ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Good teaching style, very knowledgeable. Sessions were well structured and helped improve my grades significantly."
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">- Sarah L.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ProfileDetailScreen;
