import * as React from "react"
import Svg, { Mask, Path } from "react-native-svg"

function EmptyHearIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 23 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask id="a" fill="#fff">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.474 1.923a5.5 5.5 0 000 7.779l8.132 8.131a1 1 0 001.414 0l.01-.01a.996.996 0 00.312-.212l8.132-8.131a5.5 5.5 0 10-7.778-7.778l-1.333 1.332-1.11-1.11a5.5 5.5 0 00-7.779 0z"
        />
      </Mask>
      <Path
        d="M12.03 17.823l-.789-1.838-.353.152-.272.272 1.414 1.415zm.312-.212l-1.414-1.414 1.414 1.415zm8.132-8.131l1.414 1.414-1.414-1.414zm-7.778-7.778L11.282.287l1.414 1.415zm-1.333 1.332L9.95 4.45l1.414 1.414 1.414-1.414-1.414-1.415zm-1.11-1.11L8.837 3.337l1.414-1.415zM3.887 8.286a3.5 3.5 0 010-4.95L1.06.51a7.5 7.5 0 000 10.607l2.828-2.829zm8.132 8.132L3.888 8.287 1.06 11.116l8.132 8.131 2.828-2.828zm-1.414 0a1 1 0 011.414 0l-2.828 2.828a3 3 0 004.242 0l-2.828-2.828zm.01-.01l-.01.01 2.828 2.828.01-.01-2.829-2.828zm.312-.212c.09-.09.197-.162.313-.211l1.577 3.676c.343-.148.663-.36.939-.636l-2.829-2.829zm8.132-8.131l-8.132 8.131 2.829 2.829 8.131-8.132-2.828-2.828zm0-4.95a3.5 3.5 0 010 4.95l2.828 2.828a7.5 7.5 0 000-10.607L19.06 3.116zm-4.95 0a3.5 3.5 0 014.95 0L21.888.287a7.5 7.5 0 00-10.606 0l2.828 2.829zm-1.333 1.333l1.333-1.333L11.282.287 9.949 1.62l2.828 2.829zM8.838 3.338l1.11 1.11 2.83-2.828L11.665.51 8.838 3.337zm-4.95 0a3.5 3.5 0 014.95 0L11.666.509A7.5 7.5 0 001.06.51l2.828 2.829z"
        fill="#000"
        mask="url(#a)"
      />
    </Svg>
  )
}

export default EmptyHearIcon
