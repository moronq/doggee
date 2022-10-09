export const setCookie = (
  name: string,
  value: string | number | boolean | null,
  props: $TSFixMe = {}
) => {
  const cookieOptions: $TSFixMe = {}

  if (typeof props.expires === 'number' && props.expires) {
    const date = new Date()
    date.setTime(date.getTime() + props.expires * 1000)
    cookieOptions.expires = date
  }

  if (props.expires && props.expires.toUTCString) {
    cookieOptions.expires = props.expires.toUTCString()
  }

  const cookieValue = value ? encodeURIComponent(value) : null
  // let updateCookie = name + '=' + cookieValue

  // for (const propName in props) {
  //   if (propName) {
  //     updateCookie += '; ' + propName
  //     const propValue = props[propName]
  //     if (propValue !== true) {
  //       updateCookie += '=' + propValue
  //     }
  //   }
  // }
  // document.cookie = updateCookie
}
