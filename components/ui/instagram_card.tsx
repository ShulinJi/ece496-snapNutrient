import * as React from "react";
import { cn } from "@/lib/utils";

// Main Card styled like an Instagram post
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-white shadow-sm", className)} // Instagram-like styling
    {...props}
  />
));
Card.displayName = "Card";

// Header for profile info
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {user: string; profilePic: string}
>(({ className, user, profilePic, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 text-black", className)} // Flex layout for profile pic and username
    {...props}
  >
    {/* Profile Picture */}
    <img
      src="/path/to/profile-pic.jpg"
      alt="Profile"
      className="w-10 h-10 rounded-full mr-3" // Round profile picture
    />
    {/* Username */}
    <span className="font-semibold text-black">{user}</span>
  </div>
));
CardHeader.displayName = "CardHeader";

// Image content of the post
const CardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("w-full object-cover", className)} // Full width image
    {...props}
  />
));
CardImage.displayName = "CardImage";

// Actions (like, comment, share)
// accept likes, comments, share as props and display the counts
const CardActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {likes: number; comments: number; share: number}
>(({ className, likes, comments, share, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center space-x-4 p-4", className)} // Action icons layout
    {...props}
  >
    <button className="text-gray-600 flex items-center">
      ❤️ <span className="ml-1">{likes}</span> 
      </button> {/* Like Icon */}
    <button className="text-gray-600 flex items-center">
      💬 <span className="ml-1">{comments}</span>
      </button> {/* Comment Icon */}
    <button className="text-gray-600">
      🔗 <span className="ml-1">{share}</span>
      </button> {/* Share Icon */}
  </div>
));
CardActions.displayName = "CardActions";

// Caption section
const CardCaption = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {user: string; content: string}
>(({ className, user, content, ...props }, ref) => (
  <p ref={ref} className={cn("px-4 py-2 text-sm text-black", className)} {...props}>
    <span className="font-semibold">{user}</span> {content}
  </p>
));
CardCaption.displayName = "CardCaption";

// Comments preview
const CardComments = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-4 py-2 text-sm text-black", className)} {...props}>
    View all comments...
  </div>
));
CardComments.displayName = "CardComments";

export { Card, CardHeader, CardImage, CardActions, CardCaption, CardComments };