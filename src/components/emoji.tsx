import React from "react"
interface Props {
  className?: string
  label?: string
  symbol?: number
}

const Emoji = React.memo(({ className, label, symbol }: Props) => (
  <span className={className} role="img" aria-label={label}>
    {symbol ? String.fromCodePoint(symbol) : ""}
  </span>
))

export default Emoji
