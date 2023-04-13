import { toast } from 'react-toastify'

export const Toast = (check:boolean ,name:string) => {
  if (check) {
    return toast.success(name,{
     
    })
  } else {
    return toast.error(name, {
      style: {
        color: '#fff',
        backgroundColor: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        width: '90vw'
      }
    })
  }
}
