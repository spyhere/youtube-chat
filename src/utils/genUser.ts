import { Participant } from "../chat";
import { CHAR, USERNAME_PROBS } from "../constants";

const allAvatars = [
  "https://cdn-tunes-im.magnific.com/moods/Tranquil_Meditation_at_Dawn.jpeg?im=SmartCrop,algorithm=dnn,width=256,height=256",
  "https://legismusic.com/_next/image?url=https%3A%2F%2Ftunecutter.s3.eu-west-2.amazonaws.com%2Fimages%2Ftracks%2F7950%2Ftrackimage-7950-65c3c9270d3e15.71823199.darkmood.jpg&w=256&q=75",
  "https://images.stockcake.com/public/3/4/6/346899e1-9221-4006-90db-d5c8b0134250_medium/medieval-warrior-emerges-stockcake.jpg",
  "https://legismusic.com/_next/image?url=https%3A%2F%2Ftunecutter.s3.eu-west-2.amazonaws.com%2Fimages%2Ftracks%2F8826%2Ftrackimage-8826-65c64a3a95da98.45540106.quirky.jpg&w=256&q=75",
  "https://b.thumbs.redditmedia.com/yo8xIY0bI_3lMNdcICg9FS6bAWhbeQ2kfPrea98B7Fg.png",
  "https://preview.free3d.com/img/2014/11/2704932537993529045/1xzicu2b.jpg",
  "https://thangs.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-thangs-public%2Fuploads%2Fattachments%2Fe30ed3f2-8443-442e-b981-a21d34d591b2%2FFrontIso.png&w=256&q=75",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFOoUoK66_EuavztuHtrpRGZszjWXnSTL5Q4OvDRgYWaTRjEZy4f6C3hNo&s=10",
  "https://media.forgecdn.net/avatars/thumbnails/560/998/256/256/637912677448477317.jpeg",
  "https://em-content.zobj.net/source/facebook/65/smiling-face-with-sunglasses_1f60e.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVIHUJZJyytwojcYdkpZp7QFn9KgfR-ZTPCsYeUiCfw&s=10",
  "https://img2.storyblok.com/256x256/filters:quality(10)/f/131443/1064x1064/51dfa561c3/essentials-closing-the-loop-with-customers-webinar-thumbnail.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlB6WbsD0_DnqK8riCB_CwW3I8XG64ufiQchf_QxHn8A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaogiGUxctj7faRsYqGrYf4Yivfs-6ihFDagPPfKsGH8T_mukvkTu2L_w&s=10",
  "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/38705/square_thumb%402x.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOC7P5lYTT4r1aGdpVLRwBl3j7nnp2suwtTwaX05EeWg&s",
  "https://play-lh.googleusercontent.com/kpmDNIoaD3RW4w2HRirKkVxe0qMAerP3i2hRYad_v0_qu58fSLkUMAcWTn9jzAz7WXBsn7z5JBImCjvQZcqn7fU=s256-rw",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPb3dinZKzHTsMzhPnRIO6XA0cNrG7d1-XPtCaUCL3t5NtxzAaPNvksA0&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQ3_MPvvu4zW8jRCYhQ6O-sgRCBmJPX9SEuGLrItkjiDxXxZCvPwgyDIe&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyvz9CJcgM_2fgaC0Muj_Y5dJOTAEsr3InVcbuPn24A&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRebMyeUntdaLB8BSH2TWx3GcPoCUzBww7rZFXe2wi5GQ&s=10",
]

const avatarsKeeper = [...allAvatars]

function genUsername(): string {
  const { MIN_LEN, MAX_LEN, NUM_PROBS } = USERNAME_PROBS
  const len = Math.max(Math.round(Math.random() * (MAX_LEN - MIN_LEN)) + MIN_LEN, MIN_LEN)
  let numLen = 0
  if (Math.random() <= NUM_PROBS) {
    numLen = Math.round(Math.random() * 5)
  }

  const { LOW_START, LOW_END } = CHAR.LAT
  const res = new Array<string>(len + numLen)
  for (let i = 0; i < len + numLen; i++) {
    if (i < len) {
      const c = Math.round(Math.random() * (LOW_END - LOW_START)) + LOW_START
      res.push(String.fromCharCode(c))
    } else {
      res.push(String(Math.round(Math.random() * 10)))
    }
  }
  return res.join("")
}

export function genUser(): Participant {
  const avatar = avatarsKeeper.pop() || allAvatars[Math.floor(Math.random() * allAvatars.length)]
  return {
    avatar: avatar,
    username: genUsername()
  }
}

export function destroyUser(user: Participant) {
  avatarsKeeper.push(user.avatar)
}

