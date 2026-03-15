
export default function CommonTitle({title, subtitle}:{title: string, subtitle: string}) {
  return (
    <div className="text-center space-y-3 ">
      <h3 className="text-3xl font-bold">{title}</h3>
      <p>{subtitle}</p>
    </div>
  )
}
