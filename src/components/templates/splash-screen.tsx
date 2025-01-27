import MyLogo from '../atoms/my-logo';

export default function SplashScreen() {
    return (
        <main className='flex h-screen flex-col items-center justify-center'>
            <MyLogo
                className='animate-pulse'
                variant='mobile'
                height={250}
                width={250}
            />
        </main>
    )
}
