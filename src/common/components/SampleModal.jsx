import { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

export default function SimpleModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="relative p-4">
      <Button onClick={handleOpen} color="blue">
        모달 열기
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        className="absolute top-1/4 left-1/6 h-1/2 w-1/2 bg-[var(--point)]"
      >
        <DialogHeader>모달 제목</DialogHeader>
        <DialogBody>이것은 샘플로 만든 모달입니다</DialogBody>
        <DialogFooter>
          <Button variant="text" color="gray" onClick={handleOpen} className="mr-2">
            닫기
          </Button>
          <Button variant="gradient" color="blue" onClick={handleOpen}>
            확인
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
