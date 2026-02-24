import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/hooks/useBlog";
import { useLanguage } from "@/contexts/LanguageContext";

const ShareButton = ({ icon: Icon, href, label }: { icon: any; href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-muted hover:bg-primary/20 flex items-center justify-center transition-colors"
    aria-label={label}
  >
    <Icon className="w-4 h-4 text-muted-foreground hover:text-primary" />
  </a>
);

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const { currentPost, isLoading, error, fetchPostBySlug } = useBlog();

  useEffect(() => {
    if (slug) {
      fetchPostBySlug(slug);
    }
  }, [slug, fetchPostBySlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-zenora flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">{t("blog.loadingArticle")}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-zenora text-center min-h-[50vh] flex flex-col items-center justify-center">
            <h1 className="font-display text-4xl font-bold mb-4">{t("blog.notFound")}</h1>
            <p className="text-muted-foreground mb-8">{t("blog.notFoundDesc")}</p>
            <Button variant="gold" asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("blog.backToList")}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = language === "en" && currentPost.titleEn ? currentPost.titleEn : currentPost.title;
  const content = language === "en" && currentPost.contentEn ? currentPost.contentEn : currentPost.content;
  const category = language === "en" && currentPost.categoryEn ? currentPost.categoryEn : currentPost.category;
  const tags = language === "en" && currentPost.tagsEn ? currentPost.tagsEn : currentPost.tags;

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(title);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={title}
        description={language === "en" && currentPost.excerptEn ? currentPost.excerptEn : currentPost.excerpt}
        image={currentPost.coverImage}
      />
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <img
            src={currentPost.coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="container-zenora pb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("blog.backToList")}
                </Link>
                
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
                  {category}
                </span>
                
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {currentPost.author.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(currentPost.publishedAt).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {currentPost.readingTime} min {language === "fr" ? "de lecture" : "read"}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-zenora">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Sidebar */}
              <aside className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-32 space-y-8">
                  {/* Share */}
                  <div className="p-6 rounded-xl bg-card border border-border">
                    <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      {t("blog.share")}
                    </h4>
                    <div className="flex gap-2">
                      <ShareButton
                        icon={Facebook}
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        label="Facebook"
                      />
                      <ShareButton
                        icon={Twitter}
                        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                        label="Twitter"
                      />
                      <ShareButton
                        icon={Linkedin}
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                        label="LinkedIn"
                      />
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {tags && tags.length > 0 && (
                    <div className="p-6 rounded-xl bg-card border border-border">
                      <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
              
              {/* Article Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3 order-1 lg:order-2"
              >
                <div 
                  className="prose prose-lg prose-invert max-w-none
                    prose-headings:font-display prose-headings:text-foreground
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground
                    prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                    prose-blockquote:border-l-primary prose-blockquote:bg-accent/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                
                {/* CTA */}
                <div className="mt-12 p-8 rounded-2xl bg-gradient-gold text-center">
                  <h3 className="font-display text-2xl font-bold text-primary-foreground mb-4">
                    {t("blog.cta.title")}
                  </h3>
                  <p className="text-primary-foreground/80 mb-6">
                    {t("blog.cta.description")}
                  </p>
                  <Button variant="dark" size="lg" asChild>
                    <Link to="/contact">{t("blog.cta.button")}</Link>
                  </Button>
                </div>
              </motion.article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
