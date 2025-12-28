import Icons from '@/assets/icons';

type MyProfilePageProps = {
  setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function MyProfilePagePage({ setMobileOpen }: MyProfilePageProps) {
  return (
    <>
      <Icons.Down
        className='block rotate-90 cursor-pointer md:hidden'
        onClick={() => setMobileOpen?.(false)}
      />
    </>
  );
}
