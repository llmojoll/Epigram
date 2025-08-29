import BasicModal from '@/components/common/BasicModal';
import { Button } from '@/components/ui/button';

export default function ButtonTest() {
  return (
    <div className='flex flex-col gap-4 p-8'>
      <h1 className='text-2xl font-bold mb-4'>Button Variants</h1>

      <div className='flex gap-4 flex-wrap'>
        <Button>기본 버튼</Button>
        <Button variant='blue900' size='md'>
          파란 버튼
        </Button>
        <Button variant='line100' size='sm'>
          라인 버튼
        </Button>
        <Button variant='black600' size='lg'>
          큰 버튼
        </Button>
        <Button variant='line200' size='icon'>
          아이콘 버튼
        </Button>
      </div>

      <div className=''>
        <BasicModal />
      </div>
    </div>
  );
}
