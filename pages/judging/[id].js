import prisma from '../../lib/prisma'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react'
import Cookies from 'cookies'

export default function Judging({ update, reaction, emojiArray, colorEmojis }) {
  const [emojiState, setEmojiState] = useState(0)
  const [selected, setSelected] = useState({
    1: reaction?.emoji[0] || '❓',
    2: reaction?.emoji[1] || '❓',
    3: reaction?.emoji[2] || '❓',
    4: reaction?.emoji[3] || '❓',
    5: reaction?.emoji[4] || '❓'
  })
  const [saved, setSaved] = useState(false)
  function upload(selectedToUse) {
    setSaved(false)
    fetch(`/api/judge?update=${update.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emoji: Object.values(selectedToUse).map(x => x.native || x.src || x)
      })
    }).then(r => {
      setSaved(true)
    })
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={update.attachments[0]}
        width="400px"
        style={{ marginBottom: '12px', borderRadius: '8px' }}
      />
      <h1>Select Up To Five Emojis To Describe XXX</h1>
      <div
        style={{
          margin: 'auto',
          display: 'grid',
          maxWidth: '500px',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          fontSize: '32px',
          gap: '16px',
          marginTop: '8px'
        }}
      >
        <span
          onClick={async () => {
            setEmojiState(1)
          }}
          style={{
            background: 'var(--colors-slate)',
            padding: '8px',
            borderRadius: '20px',
            paddingTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="clap"
        >
          {selected[1].native ||
           ((selected[1].src || selected[1].includes('http')) && (
            <img src={selected[1].src || selected[1]} height="40px" />
          )) ||
            selected[1]}
        </span>
        <span
          onClick={async () => {
            setEmojiState(2)
          }}
          style={{
            background: 'var(--colors-slate)',
            padding: '8px',
            borderRadius: '20px',
            paddingTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="clap"
        >
          {selected[2].native ||
            ((selected[2].src || selected[2].includes('http')) && (
              <img src={selected[2].src || selected[2]} height="40px" />
            )) ||
            selected[2]}
        </span>
        <span
          onClick={async () => {
            setEmojiState(3)
          }}
          style={{
            background: 'var(--colors-slate)',
            padding: '8px',
            borderRadius: '20px',
            paddingTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="clap"
        >
          {selected[3].native ||
            ((selected[3].src || selected[3].includes('http')) && (
              <img src={selected[3].src || selected[3]} height="40px" />
            )) ||
            selected[3]}
        </span>
        <span
          onClick={async () => {
            setEmojiState(4)
          }}
          style={{
            background: 'var(--colors-slate)',
            padding: '8px',
            borderRadius: '20px',
            paddingTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="clap"
        >
          {selected[4].native ||
            ((selected[4].src || selected[4].includes('http')) && (
              <img src={selected[4].src || selected[4]} height="40px" />
            )) ||
            selected[4]}
        </span>
        <span
          onClick={async () => {
            setEmojiState(5)
          }}
          style={{
            background: 'var(--colors-slate)',
            padding: '8px',
            borderRadius: '20px',
            paddingTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="clap"
        >
          {selected[5].native ||
           ((selected[5].src || selected[5].includes('http')) && (
            <img src={selected[5].src || selected[5]} height="40px" />
          )) ||
            selected[5]}
        </span>
       
      </div>
      {saved && <><br />✅ Saved!</>}
      <div
        style={{
          position: 'absolute',
          height: '100vh',
          top: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: emojiState == 0 ? 'none' : 'flex',
          width: '100vw',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            height: '100vh',
            top: 0,
            display: emojiState == 0 ? 'none' : 'flex',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setEmojiState(0)}
        ></div>
        <Picker
          data={data}
          onEmojiSelect={emoji => {
            let newData = {}
            newData[emojiState] = emoji
            setSelected({ ...selected, ...newData })
            setEmojiState(0)
            upload({ ...selected, ...newData })
          }}
          custom={[
            {
              id: 'slack',
              name: 'Slack',
              emojis: [
                ...emojiArray
              ]
            },
            {
              id: 'slack-colors',
              name: 'Colors',
              emojis: [
                ...colorEmojis
              ]
            }
            // {
            //   id: 'github',
            //   name: 'GitHub',
            //   emojis: [
            //     {
            //       id: 'octocat',
            //       name: 'Octocat',
            //       keywords: ['github'],
            //       skins: [
            //         {
            //           src: 'https://emoji.slack-edge.com/T0266FRGM/jankman/09159ada2ee32987.png'
            //         }
            //       ]
            //     },
            //     {
            //       id: 'shipit',
            //       name: 'Squirrel',
            //       keywords: ['github'],
            //       skins: [
            //         {
            //           src: 'https://emoji.slack-edge.com/T0266FRGM/see/3d0731c7ba6f4af1.png'
            //         }
            //       ]
            //     }
            //   ]
            // },
            // {
            //   id: 'gifs',
            //   name: 'GIFs',
            //   emojis: [
            //     {
            //       id: 'party_parrot',
            //       name: 'Party Parrot',
            //       keywords: ['dance', 'dancing'],
            //       skins: [
            //         {
            //           src: 'https://emoji.slack-edge.com/T0266FRGM/party-dinosaur/d6219c5b10086a16.gif'
            //         }
            //       ]
            //     }
            //   ]
            // }
          ]}
        />
      </div>
      <style>{`
      .emojiWrap > div > em-emoji-picker {
        margin: auto
      }
      `}</style>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const cookies = new Cookies(ctx.req, ctx.res);
  const { check } = require('../api/get-auth-state.js');
  const authed = await check(ctx.req, ctx.res);
  if (!authed) {
    cookies.set('assemble_continue', '/judging/' + ctx.params.id, {
      overwrite: true,
      expires: new Date(Date.now() + 1000 * 60 * 10),
      httpOnly: true,
    });
    ctx.res.statusCode = 302
    ctx.res.setHeader('Location', `/login`);
    ctx.res.end();
    return {props: {}}
  }
  let reaction = await prisma.reactions.findFirst({
    where: {
      cookie: cookies.get('assemble-judging')
    }
  })
  let update = await prisma.updates.findFirst({
    where: {
      postNumber: parseInt(ctx.params.id)
    },
    include: {
      Accounts: true,
      reactions: true
    }
  })
  let emojis = await fetch('http://badger-zeta.vercel.app/api/emoji').then(r =>
    r.json()
  )
  console.log(reaction);
  const colorEmojis = [];
  const emojiArray = (() => {
    const values = Object.values(emojis);
    return Object.keys(emojis).map((key, i) => {
      return {
        id: key.toLowerCase(),
        name: key,
        keywords: [key.toLowerCase(), ...key.split('_'), ...key.split('-')],
        skins: [
          {
            src: values[i]?.startsWith('alias:') ? emojis[values[i].substring(6)] : values[i]
          }
        ]
      };
    }).filter(key => {
      const filter = !(+key.name >= 0 && +key.name <= 200000 && key.name.length == 6) &&
      !(key.name.startsWith('color_')) &&
      !(key.name.startsWith('balloon_')) &&
      !(key.name.startsWith('p_'));
      if (!filter) colorEmojis.push(key); // push all of the color emojis to their own section
      return filter;
    })
  })();
  return { props: { update, emojis, reaction, emojiArray, colorEmojis } }
}
