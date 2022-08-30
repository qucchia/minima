export default function Icon({ icon, size }: { icon: string, size?: string }) {
  return (
    <i
      className={`ri-${icon}-line`}
      style={size ? { fontSize: size } : {}}
    ></i>
  )
}