import React from 'react';
import { motion } from 'framer-motion';

const journalImages = [
  '/products/IMG_2074.jpg',
  '/products/IMG_2075.jpg',
  '/products/IMG_2076.jpg',
  '/products/IMG_2077.jpg',
  '/products/IMG_2079.jpg',
  '/products/IMG_2080.jpg'
];

const productViewImages = [
  '/products/IMG_2082.jpg',
  '/products/IMG_2078.jpg',
  '/products/IMG_2080.jpg',
  '/products/IMG_2083.jpg'
];

function Home({ t }) {
  const home = t.home;

  return (
    <main className="brand-home">
      <section className="brand-hero" id="home">
        <motion.div
          className="brand-hero-media"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <img src="/products/IMG_2081.jpg" alt={home.hero.imageAlt} />
        </motion.div>

        <motion.div
          className="brand-hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
        >
          <p className="brand-kicker">{home.hero.kicker}</p>
          <h1>{home.hero.title}</h1>
          <p>{home.hero.subtitle}</p>
          <div className="brand-hero-specs" aria-label={home.hero.specLabel}>
            {home.hero.specs.map((spec) => (
              <span key={spec}>{spec}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="brand-product-view" aria-label={home.productView.ariaLabel}>
        <motion.div
          className="product-view-label"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>{home.productView.kicker}</span>
          <p>{home.productView.title}</p>
        </motion.div>

        <div className="product-view-grid">
          {productViewImages.map((image, index) => (
            <motion.figure
              className="product-view-frame"
              key={image}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.6 }}
            >
              <img src={image} alt={`${home.productView.imageAlt} ${index + 1}`} />
              <figcaption>{`JML_${String(index + 1).padStart(2, '0')}`}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="brand-section brand-categories" id="collection">
        <motion.div
          className="brand-section-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="brand-kicker">{home.collection.kicker}</p>
          <h2>{home.collection.title}</h2>
        </motion.div>

        <div className="category-grid">
          {home.collection.items.map((category, index) => (
            <motion.article
              className="category-tile"
              key={category.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
            >
              <img src={category.image} alt={category.alt} />
              <div>
                <span>{category.code || String(index + 1).padStart(2, '0')}</span>
                <h3>{category.title}</h3>
                {category.concept && <strong>{category.concept}</strong>}
                <p>{category.subtitle}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="brand-section lifestyle-section">
        <motion.div
          className="lifestyle-copy"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="brand-kicker">{home.lifestyle.kicker}</p>
          <h2>{home.lifestyle.title}</h2>
          <p>{home.lifestyle.description}</p>
        </motion.div>

        <div className="journal-grid" aria-label={home.lifestyle.ariaLabel}>
          {journalImages.map((image, index) => (
            <motion.img
              src={image}
              alt={`${home.lifestyle.imageAlt} ${index + 1}`}
              key={image}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.55 }}
            />
          ))}
        </div>
      </section>

      <section className="brand-philosophy" id="about">
        <motion.div
          className="philosophy-image"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src="/products/IMG_2083.jpg" alt={home.philosophy.imageAlt} />
        </motion.div>

        <motion.div
          className="philosophy-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="brand-kicker">{home.philosophy.kicker}</p>
          <h2>{home.philosophy.title}</h2>
          <p>{home.philosophy.description}</p>
          <div className="philosophy-points">
            {home.philosophy.points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default Home;
