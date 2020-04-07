
export const embedYoutube = (link) => {
  const embed = 'https://youtube.com/embed/'
  let video = link.split('&')[0]
  video = video.split('/')
  video = video[video.length - 1]
  video = video.split('=')
  video = video[video.length - 1]
  return embed + video
}