import * as React from "react";
import { Card, CardHeader, CardImage, CardActions, CardCaption, CardComments} from '@/components/ui/instagram_card'; 
export default function SocialPlatform_tab() {
    // Mock social post data
    const posts = [
        {
        id: 1,
        user: 'David Wang',
        content: 'Just tracked my lunch! Down 5 pounds this week! 💪',
        picture: '/images/david cooking.jpg',
        likes: 24,
        comments: 3,
        share: 2
        },
        {
        id: 2,
        user: 'Larry Long',
        content: 'Check out my healthy meal prep for the week! #SnapNutrient',
        picture: 'path/to/image.jpg',
        likes: 18,
        comments: 5,
        share: 3
        }
    ];

    return (
      <div className="space-y-4 pb-16">
        {posts.map((post) => (
          <Card key={post.id} className="max-w-md mx-auto">
            {/* Using CardHeader component properly */}
            <CardHeader
              user={post.user}
              profilePic="/path/to/profile-pic.jpeg" // Make sure to replace with actual user profile picture paths
              className="flex items-center space-x-3 p-4"
            />
    
            {/* Using CardImage component */}
            <CardImage
              src={post.picture}
              alt="Post image"
              className="w-full h-64 object-cover"
            />
    
            {/* Using CardActions component */}
            <CardActions
              likes={post.likes}
              comments={post.comments}
              share={post.share}
            />
    
            {/* Using CardCaption component */}
            <CardCaption
              user={post.user}
              content={post.content}
            />
    
            {/* Using CardComments component */}
            <CardComments>
              View all {post.comments} comments...
            </CardComments>
          </Card>
        ))}
      </div>
    );
}