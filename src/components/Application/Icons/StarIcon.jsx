import * as React from "react"
import Svg, { Path } from "react-native-svg"

function StarIcon(props) {
  return (
    <Svg
      width={22}
      height={20}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.141.689c.313-.892 1.575-.892 1.888 0l1.852 5.28a1 1 0 00.944.668h5.821c.987 0 1.377 1.279.558 1.83l-4.573 3.077a1 1 0 00-.386 1.16l1.778 5.067c.318.908-.704 1.698-1.502 1.16l-4.878-3.28a1 1 0 00-1.116 0l-4.878 3.28c-.798.538-1.82-.252-1.502-1.16l1.778-5.066a1 1 0 00-.386-1.161L.966 8.467c-.82-.551-.43-1.83.558-1.83h5.821a1 1 0 00.944-.669L10.14.69z"
        fill="#FFE600"
      />
    </Svg>
  )
}

export default StarIcon
