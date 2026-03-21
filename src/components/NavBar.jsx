'use-client'
import { navbarData, copyRightIcon } from '@/assets';

const NavBar = ({ id }) => {
    return (
        <div className='w-17.5 h-full fixed left-0 top-0 flex flex-col justify-between border-r border-gray-200 px-4 xl:py-10 py-6 z-10'>
            <a href="#home">
                <span className='text-3xl font-semibold text-red-400'>A</span>.
                <span className='block w-min rotate-90 origin-bottom text-[12px] font-semibold dark:text-white transition-colors'>Costa</span>
            </a>
            <div className='flex flex-col xl:gap-y-3 gap-y-1 '>
                {navbarData.map((data, index) => (
                    <a href={`/#${data.id}`} key={index} className='group flex flex-col items-center gap-y-2'>
                        <span className={`text-2xl xl:group-hover:scale-125 group-hover:scale-115 transition-all ${id === data.id ? 'text-red-500 xl:scale-110 scale-100' : 'text-yellow-600 xl:scale-100 scale-90'}`}>{data.icon}</span>
                        <span className={`text-[10px] tracking-wide opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-center dark:text-white ${index % 2 === 0 && id !== data.id ? "translate-x-2" : "-translate-x-2"} ${id === data.id && "translate-x-0 opacity-100 text-center"}`}>{data.name}</span>
                    </a>
                ))}
            </div>
            <p className='flex items-center justify-center text-[13px] text-gray-500 mt-6'>
                <span className='absolute left-1/2 w-max flex items-center -rotate-90 origin-bottom-left tracking-wider dark:text-gray-200 transition-colors'>{copyRightIcon} 2019 - {new Date().getFullYear()}</span>
            </p>
        </div>
    )
}

export default NavBar;