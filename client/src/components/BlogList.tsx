import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { Link } from "wouter";
import { PixelButton } from "./ui/pixel-button";
import { PixelCard } from "./ui/pixel-card";
import { Skeleton } from "./ui/skeleton";
import { format } from "date-fns";

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <PixelCard borderColor="arcade-green" className="md:flex">
      <div className="md:w-1/3">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-48 md:h-full object-cover object-center pixelated"
        />
      </div>
      <div className="p-6 md:w-2/3">
        <h3 className="font-press-start text-xl mb-3 text-arcade-green">{post.title}</h3>
        <p className="font-vt323 text-lg text-coin-yellow mb-2">
          {format(new Date(post.publishDate), "MMMM d, yyyy")}
        </p>
        <p className="font-vt323 text-xl mb-4">{post.excerpt}</p>
        <PixelButton asChild variant="primary">
          <Link href={`/blog/${post.slug}`} className="font-vt323">
            READ MORE
          </Link>
        </PixelButton>
      </div>
    </PixelCard>
  );
};

const BlogSkeleton = () => (
  <div className="bg-dark-screen rounded-lg overflow-hidden border-2 border-arcade-green mb-8">
    <div className="md:flex">
      <div className="md:w-1/3">
        <Skeleton className="w-full h-48 md:h-full" />
      </div>
      <div className="p-6 md:w-2/3">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  </div>
);

const BlogList = () => {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  return (
    <section id="blogs" className="py-16 bg-gradient-to-b from-black to-dark-screen">
      <div className="container mx-auto px-4">
        <h2 className="font-press-start text-2xl md:text-3xl mb-12 text-center text-retro-magenta">BLOGS</h2>
        
        <div className="max-w-5xl mx-auto">
          {error ? (
            <div className="text-center text-red-500 font-vt323 text-xl">
              Failed to load blog posts. Please try again later.
            </div>
          ) : (
            <div className="space-y-8">
              {isLoading ? (
                <>
                  <BlogSkeleton />
                  <BlogSkeleton />
                  <BlogSkeleton />
                </>
              ) : (
                posts?.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
