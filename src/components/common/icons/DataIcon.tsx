import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const DataIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 10 10"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".5"
        clipPath="url(#a)"
      >
        <path d="M8.833 9.167c.117 0 .175 0 .22-.023a.208.208 0 0 0 .09-.091c.024-.045.024-.103.024-.22V4.5c0-.117 0-.175-.023-.22a.208.208 0 0 0-.091-.09c-.045-.023-.103-.023-.22-.023h-1c-.116 0-.175 0-.22.022a.208.208 0 0 0-.09.091c-.023.045-.023.103-.023.22v1c0 .117 0 .175-.023.22a.208.208 0 0 1-.09.09c-.045.023-.104.023-.22.023h-1c-.117 0-.175 0-.22.023a.208.208 0 0 0-.091.091c-.023.045-.023.103-.023.22v1c0 .116 0 .175-.022.22a.208.208 0 0 1-.091.09c-.045.023-.103.023-.22.023h-1c-.117 0-.175 0-.22.023a.208.208 0 0 0-.09.09c-.023.045-.023.104-.023.22v1c0 .117 0 .175.022.22.02.04.052.071.091.09.045.024.103.024.22.024h4.333ZM4.167 2.833c0-.116 0-.175.022-.22a.208.208 0 0 1 .091-.09c.045-.023.103-.023.22-.023h1c.117 0 .175 0 .22.023.039.02.07.052.09.09.023.045.023.104.023.22v1c0 .117 0 .175-.022.22a.208.208 0 0 1-.091.09c-.045.024-.103.024-.22.024h-1c-.117 0-.175 0-.22-.023a.208.208 0 0 1-.09-.091c-.023-.045-.023-.103-.023-.22v-1Zm-2.917 2.5c0-.116 0-.175.023-.22a.208.208 0 0 1 .09-.09C1.409 5 1.468 5 1.584 5h1c.117 0 .175 0 .22.023.04.02.071.052.09.09.024.045.024.104.024.22v1c0 .117 0 .175-.023.22a.208.208 0 0 1-.091.09c-.045.024-.103.024-.22.024h-1c-.116 0-.175 0-.22-.023a.208.208 0 0 1-.09-.091c-.023-.045-.023-.103-.023-.22v-1ZM.833 1.167c0-.117 0-.175.023-.22A.208.208 0 0 1 .947.856c.045-.023.103-.023.22-.023h1c.116 0 .175 0 .22.023.038.02.07.052.09.091.023.045.023.103.023.22v1c0 .116 0 .175-.023.22a.208.208 0 0 1-.09.09c-.045.023-.104.023-.22.023h-1c-.117 0-.175 0-.22-.023a.208.208 0 0 1-.091-.09c-.023-.045-.023-.104-.023-.22v-1Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h10v10H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DataIcon = React.memo(DataIconComponent);
