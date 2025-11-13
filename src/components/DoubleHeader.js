export default function DoubleHeader({preTitle,mainTitle}){
    return (
        <div className="flex flex-col">
            <h3 className="text-indigo-200 text-sm uppercase tracking-widest mb-2">
              {preTitle}
            </h3>
            <h2 className="text-4xl font-extrabold mb-6">{mainTitle}</h2>
        </div>
    )
}