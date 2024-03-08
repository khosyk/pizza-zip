import toast from 'react-hot-toast'

export default function toaster(
  api: Promise<unknown>,
  loading:string|undefined = '업로드중...',
  success:string|undefined = '성공',
  error:string|undefined = '실패, 잠시후 다시 시도해주세요.'
) {
  toast.promise(api, {
    loading,
    success,
    error,
  })
}