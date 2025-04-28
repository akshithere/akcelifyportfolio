import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { BlogPost as BlogPostType } from "@shared/schema";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: [`/api/blog-posts/${slug}`],
  });

  // Scroll to top when post loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-dark-screen text-light-gray scanlines">
        <Navbar />
        <main className="py-16">
          <div className="container mx-auto px-4">
            <Link href="/blog" className="font-vt323 text-xl flex items-center mb-8 hover:text-arcade-green transition duration-300">
              <ChevronLeft className="h-5 w-5 mr-2" /> BACK TO BLOGS
            </Link>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h1 className="font-press-start text-2xl mb-6 text-red-500">Blog Post Not Found</h1>
                <p className="font-vt323 text-xl">
                  Sorry, the blog post you're looking for doesn't exist or has been removed.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-screen text-light-gray scanlines">
      <Navbar />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="font-vt323 text-xl flex items-center mb-8 hover:text-arcade-green transition duration-300">
            <ChevronLeft className="h-5 w-5 mr-2" /> BACK TO BLOGS
          </Link>
          
          <div className="max-w-4xl mx-auto bg-dark-screen p-6 rounded-lg border-2 border-arcade-green">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-3/4 mb-6" />
                <div className="mb-4 flex items-center">
                  <Skeleton className="h-4 w-40 mr-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="w-full h-64 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </>
            ) : post ? (
              <>
                <h1 className="font-press-start text-2xl mb-6 text-arcade-green">
                  {post.title}
                </h1>
                <div className="mb-4 flex items-center">
                  <span className="font-vt323 text-lg text-coin-yellow mr-4">
                    {format(new Date(post.publishDate), "MMMM d, yyyy")}
                  </span>
                  <span className="font-vt323 text-lg text-light-gray">By Akshit</span>
                </div>
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-64 object-cover object-center pixelated mb-6"
                />
                <div className="font-vt323 text-xl prose prose-invert max-w-none">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
