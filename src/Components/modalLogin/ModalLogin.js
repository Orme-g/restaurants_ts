import { useDispatch, useSelector } from 'react-redux'; 
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
// eslint-disable-next-line
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'
import {Stack, TextField, Button} from '@mui/material'


import {toggleModalWindowLogin} from '../../reducers/interactive'





const ModalLogin = () => {

const dispatch = useDispatch()
const {modalWindowLogin} = useSelector(state => state.interactive)

const {register, reset, handleSubmit, formState: {errors}, control} = useForm({
    defaultValues: {
        login: '',
        password: ''
    }
})


const onSubmit = (data) => {
    console.log(`${JSON.stringify(data)} registered`)
    reset()
}


    return (
        <div>
            <Dialog open={modalWindowLogin} onClose={() => dispatch(toggleModalWindowLogin())}>
        <DialogTitle>Вход в аккаунт</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            Войдите в систему, чтобы открыть все возможности Whereats
          </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} width={300} mb={2}>
                <TextField 
                label='Логин' 
                size='small' 
                {...register('login',{
                    required: 'Введите логин'
                })}
                error={!!errors.login}
                helperText={errors.login?.message}
                />
                <TextField 
                label='Пароль' 
                type='password' 
                size='small'
                {...register('password', {
                    required: 'Введите пароль'
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                />
            </Stack>
            <Button type='submit'>Войти</Button>
            <Button onClick={() => dispatch(toggleModalWindowLogin())}>Отмена</Button>
        </form>
        <DevTool control={control}/>
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>
        </div>
    )
}


export default ModalLogin