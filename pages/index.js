import Head from 'next/head'
import Link from 'next/link'
import Meta from '@hackclub/meta'
import Reaction from '../components/reaction'
import Feed from '../components/feed'
import Footer from '../components/footer'

const Header = ({ reactions, children, theme }) => (
  <>
    <Meta
      as={Head}
      name="Scrapbook @ Assemble ~ Hack Club"
      title="Home"
      description="A diary of everything hackers get up to at Assemble."
      image="https://cloud-53i932gta-hack-club-bot.vercel.app/0scrapbook.jpg"
    />
    <header>
      {children}
      {theme && (
        <p
          style={{
            fontFamily: 'Shrikhand',
            backgroundImage: `radial-gradient( ellipse farthest-corner at top left, var(--colors-yellow), var(--colors-green) )`,
            backgroundRepeat: 'no-repeat',
            backgroundClip: 'text',
            '-webkit-background-clip': 'text',
            color: 'transparent',
            fontSize: '28px'
          }}
        >
          Scrapbook @ Assemble
        </p>
      )}
      <h1 style={{ textDecoration: 'underline' }}>
        {theme ? theme : 'Scrapbook @ Assemble'}
      </h1>
      <p>
        A diary of everything hackers get up to at{' '}
        <Link href="https://assemble.hackclub.com" passHref>
          <a>Assemble</a>
        </Link>
        .
      </p>
    </header>
    <style jsx>{`
      header {
        text-align: center;
        padding: 0 12px 48px;
      }
      h1 {
        color: var(--colors-orange);
        font-family: var(--fonts-display);
        margin: 0;
        font-size: 36px;
        line-height: 1;
        padding: 16px;
      }
      p {
        font-size: 18px;
        color: var(--colors-text);
      }
      @media (min-width: 32em) {
        h1 {
          font-size: 48px;
        }
        p {
          font-size: 24px;
        }
        header {
          padding: 24px 0 48px;
        }
      }
      @media (min-width: 48em) {
        h1 {
          font-size: 64px;
        }
      }
      a {
        color: var(--colors-orange);
        text-decoration: none;
      }
      a:hover,
      a:focus {
        text-decoration: underline;
        text-decoration-style: wavy;
        text-underline-position: under;
      }
      @supports (-webkit-background-clip: text) {
        h1 {
          background-image: radial-gradient(
            ellipse farthest-corner at top left,
            var(--colors-yellow),
            var(--colors-orange)
          );
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .post-reactions {
        justify-content: center;
        align-items: center;
        margin-top: 12px;
      }
      h2 {
        margin: 0 16px 12px;
        font-size: 18px;
      }
    `}</style>
  </>
)

const IndexPage = ({ reactions, initialData, authStatus }) => {
  return (
    <Feed initialData={initialData} footer={<Footer />}>
      <Header reactions={reactions} theme="Stupid shit nobody needs!" />
    </Feed>
  )
}
export default IndexPage

export const getStaticProps = async () => {
  const { getPosts } = require('./api/posts')
  const initialData = await getPosts(48)
  const { find, compact, map, flatten } = require('lodash')
  const names = [
    'art',
    'package',
    'hardware',
    'vsc',
    'nextjs',
    'js',
    'vercel',
    'swift',
    'rustlang',
    'slack',
    'github',
    'car',
    'musical_note',
    'robot_face',
    'birthday'
  ]
  const reactions = compact(
    names.map(name => find(flatten(map(initialData, 'reactions')), { name }))
  )
  return { props: { reactions, initialData }, revalidate: 1 }
}
