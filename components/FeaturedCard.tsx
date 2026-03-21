import Image from "next/image";

// Types for the component props
interface Creator {
  id: string | number;
  name: string;
  avatar: string; // image URL
}

interface FeaturedCardProps {
  title: string;
  description: string;
  heroImage: string;       // URL or path to the hero image
  heroImageAlt?: string;
  creators: Creator[];
  creatorCount: number;
  onArrowClick?: () => void;
  href?: string;           // optional link for the arrow button
}

export default function FeaturedCard({
  title,
  description,
  heroImage,
  heroImageAlt = "Featured image",
  creators,
  creatorCount,
  onArrowClick,
  href,
}: FeaturedCardProps) {
  return (
    <div className="featured-card">
      {/* Hero Image Banner */}
      <div className="hero-banner">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Dark overlay */}
        <div className="overlay" />

        {/* Title */}
        <h2 className="banner-title">{title}</h2>

        {/* Arrow Button */}
        {href ? (
          <a href={href} className="arrow-btn" aria-label="Go to article">
            →
          </a>
        ) : (
          <button
            className="arrow-btn"
            onClick={onArrowClick}
            aria-label="Go to article"
          >
            →
          </button>
        )}
      </div>

      {/* Description */}
      <p className="description">{description}</p>

      {/* Creators Row */}
      <div className="creators-row">
        <div className="avatars">
          {creators.slice(0, 5).map((creator) => (
            <div key={creator.id} className="avatar-wrapper">
              <Image
                src={creator.avatar}
                alt={creator.name}
                width={36}
                height={36}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
          ))}
        </div>
        <span className="creator-count">{creatorCount} major creators</span>
      </div>

      <hr className="divider" />

      <style jsx>{`
        .featured-card {
          width: 100%;
          max-width: 420px;
          font-family: sans-serif;
        }

        /* Hero Banner */
        .hero-banner {
          position: relative;
          width: 100%;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 1;
        }

        .banner-title {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 2;
          color: white;
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0;
        }

        .arrow-btn {
          position: absolute;
          bottom: 16px;
          right: 16px;
          z-index: 2;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.8);
          background: transparent;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background 0.2s;
        }

        .arrow-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Description */
        .description {
          margin: 16px 0 12px;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #333;
        }

        /* Creators */
        .creators-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .avatars {
          display: flex;
        }

        .avatar-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid white;
          margin-right: -8px;
          position: relative;
        }

        .creator-count {
          margin-left: 16px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #222;
        }

        .divider {
          border: none;
          border-top: 1px solid #e0e0e0;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
