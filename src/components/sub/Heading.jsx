const Heading = ({ title, subtitle }) => (
    <div className="flex flex-col gap-2.5 self-start mb-12">
        <div className="flex items-center gap-3">
            <div
                className="w-8 h-0.5 rounded-full shrink-0"
                style={{ background: "linear-gradient(to right, #f59e0b, #ef4444)" }}
            />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-500">
                {subtitle ?? title}
            </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-white">
            {title}
        </h2>
    </div>
)

export default Heading
