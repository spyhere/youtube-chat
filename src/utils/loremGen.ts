import { CHAR } from "../constants"

const original = "Nam scelerisque in nisl sed feugiat. Aliquam condimentum, leo eget accumsan laoreet, velit ex tincidunt sem, vel maximus dui nisl vel tellus. Vestibulum aliquam accumsan nulla, a sodales augue blandit eget. Donec vulputate bibendum justo id lobortis. Vivamus nec viverra nisi. Phasellus placerat, metus ac aliquet egestas, ex est malesuada nisl, in ornare ex elit vel mauris. Maecenas pulvinar enim a rutrum tempus. Quisque vitae condimentum nibh. Nunc sem sem, maximus malesuada magna vel, consequat auctor lectus. Sed interdum efficitur tellus eget sagittis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus ut elit varius, dapibus est ut, gravida nisi. Sed tincidunt metus non ante laoreet ultrices. Fusce sagittis ipsum vitae blandit pelle"
const lorem = original.split(" ")

// NOTE: Assumes latin chars only (for Lorem Ipsum)
function isWord(it: string): boolean {
  const cCode = it.toLowerCase().charCodeAt(0)
  const { LOW_START, LOW_END } = CHAR.LAT
  return cCode >= LOW_START && cCode <= LOW_END
}

export function genLorem(amount: number): string {
  let index = Math.floor(Math.random() * lorem.length)
  if (!isWord(lorem[index])) {
    index = (index + 1) % lorem.length
  }

  const res: string[] = []
  res.push(lorem[index][0].toUpperCase() + lorem[index].slice(1))
  let wordsAdded = 1
  while (wordsAdded < amount) {
    res.push(" ")
    const prevIndex = index
    index = (index + 1) % lorem.length
    const isCurWord = isWord(lorem[index])
    if (isCurWord) {
      wordsAdded++
    }
    if (isCurWord && lorem[prevIndex].at(-1) !== ".") {
      res.push(lorem[index][0].toLowerCase() + lorem[index].slice(1))
    } else {
      res.push(lorem[index])
    }
  }
  let str = res.join("")
  if (!isWord(str[str.length - 1])) {
    str = str.slice(0, str.length - 1)
  }
  return str + "."
}

