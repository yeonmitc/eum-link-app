import { Spinner } from '@material-tailwind/react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 min-h-[300px] max-h-full">
      <Spinner className="h-16 w-16 text-(--secondary)" />
      <h3 className="font-medium">불러오는 중입니다...</h3>
    </div>
  )
}

export default LoadingSpinner
