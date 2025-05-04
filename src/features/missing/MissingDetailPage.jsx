import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MissingDetailPage.css';

import { Box, Card, Grid, Menu, MenuItem } from '@mui/material';
import {
  EllipsisVertical,
  HeartHandshake,
  MapPin,
  Mars,
  UserRoundSearch,
  Venus,
} from 'lucide-react';

import PostComment from '@/common/components/PostComment';
import PostMap from '@/common/components/PostMap';
import ReportModal from '@/common/components/ReportModal';
import { useComments } from '@/hooks/useComment';
import { useMissingPets } from '@/hooks/useMissingPets';
import { usePetSpecies } from '@/hooks/usePetSpecies';
import useToggleMissingStatus from '@/hooks/useToggleMissingStatus';
import useUserStore from '@/store/userStore';
import Loading from '../common/Loading';
import NotFoundPage from '../common/NotFoundPage';

const MissingDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  // 목격 모달
  const [reportModal, setReportModal] = useState(false);

  const { data: pet, isLoading } = useMissingPets(id);
  const { data: species } = usePetSpecies();
  const { data: comments } = useComments('missing', id);
  // useEffect(() => { }, []);

  const { toggleStatus, error: updateError } = useToggleMissingStatus();

  // 게시글 메뉴
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (isLoading) return <Loading />;
  if (!pet || pet.length === 0) return <NotFoundPage />;

  const matchedSubSpecies = species[pet.subSpecies - 1];

  const missingBtn = () => {
    navigate('/missing');
  };
  const myPageBtn = () => {
    navigate('/mypage');
  };
  // 제보하기 버튼
  const reportBtn = () => {
    setReportModal(true);
  };

  // 게시글 삭제
  async function deletepost() {
    handleClose();
    const url = `https://my-json-server.typicode.com/yeonmitc/eum-db/missingPets/${pet?.id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) {
        console.error(`삭제 실패: ${response.status} - ${response.statusText}`);
        alert('데이터 삭제에 실패했습니다.');
        return;
      }
      console.log(`댓글 ID ${id} 삭제 성공!`);
      alert('데이터가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 중 에러 발생:', error);
      alert('삭제 중 문제가 발생 !! 😭');
    }
  }

  const IsMissingSwitch = async () => {
    handleClose();
    const result = await toggleStatus(pet);
    if (result) {
      console.log('상태 변경 성공 및 서버 데이터 수신:', result);
      alert('상태가 성공적으로 변경되었습니다! ✨');
    } else if (updateError) {
      console.error('상태 변경 중 에러 발생:', updateError);
      alert(`상태 변경 실패: ${updateError}`);
    }
  };

  return (
    <Grid container spacing={0} sx={{ padding: '0 4%', fontFamily: 'Gmarket_light',marginTop:'1vh' }}>
      <Grid
        size={12}
        sx={{
          width: '100%',
          maxHeight: '76vh',
          display: 'flex',
          color: '#fff',
          fontFamily: 'KBO_medium',
        }}
      >
        <Box id="postnav" sx={{ background: ' #436850' }} onClick={missingBtn}>
          실종 신고
        </Box>
        <Box id="postnav" sx={{ background: ' #5D9471' }}>
          {pet?.petName}{' '}
          {pet?.isMissing === true ? (
            <UserRoundSearch strokeWidth={2} />
          ) : (
            <HeartHandshake strokeWidth={2} />
          )}{' '}
        </Box>
        {/* 제보 버튼 */}
        {user?.id === pet.userId ? (
          <Box id="postnav" onClick={myPageBtn} sx={{ background: ' #5D9471', marginLeft: 'auto' }}>
            실종 제보 보기
          </Box>
        ) : (
          <Box id="postnav" onClick={reportBtn} sx={{ background: ' #5D9471', marginLeft: 'auto' }}>
            제보하기
          </Box>
        )}
      </Grid>

      <Grid container size={12}>
        <Box
          id="post"
          sx={{
            width: '100%',
            height: '75vh',
            textAlign: 'center',
            borderRadius: '0 0 20px 20px',
            padding: '4vh 5vw',
          }}
        >
          {user?.id === pet.userId ? (
            <div>
              <EllipsisVertical id="postmenu" onClick={handleClick} style={{ cursor: 'pointer' }} />
              <Menu
                anchorEl={anchorEl} // 메뉴의 앵커 엘리먼트
                open={open} // 앵커가 존재할 때 메뉴 열기
                onClose={handleClose} // 메뉴 닫기
              >
                <MenuItem onClick={deletepost}>게시글 삭제 하기</MenuItem>
                <MenuItem onClick={IsMissingSwitch}>실종 상태 변경</MenuItem>
              </Menu>
            </div>
          ) : (
            ''
          )}
          {/* 정보카드 */}
          <Grid
            container
            size={12}
            sx={{ width: '100%', height: { xs: '85%', sm: '37vh' }, display: 'flex' }}
          >
            {/* 사진 */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Card
                sx={{
                  maxWidth: { xs: '200px', sm: '90%' },
                  height: { xs: '17vh', sm: '34vh' },
                  borderRadius: '20px',
                }}
              >
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={pet?.imageUrl}
                />
              </Card>
            </Grid>
            {/* 정보상세 */}
            <Grid
              container
              size={{ xs: 12, sm: 4 }}
              id="d-text"
              fontSize={{ xs: 'smaller', md: 'medium' }}
              sx={{ maxWidth: '95%', maxHeight: { xs: 'auto', sm: '34vh' } }}
            >
              <Grid container size={12}>
                <h2>{pet?.petName} </h2>
                {pet?.isMissing === true ? '(실종됨)' : '(발견됨)'}
                <h3 style={{ marginLeft: 'auto' }}>{pet?.lostDate}</h3>
              </Grid>
              <Grid container size={12}>
                <h3>품종</h3> {matchedSubSpecies?.name}
              </Grid>
              <Grid container size={12}>
                <h3>성별</h3>{' '}
                {pet?.petGender === 'm' ? (
                  <div id="jender">
                    <Mars strokeWidth={2} color="blue" /> <Venus strokeWidth={2.75} color="gray" />
                  </div>
                ) : (
                  <div id="jender">
                    <Mars strokeWidth={2} color="gray" /> <Venus strokeWidth={2.75} color="red" />
                  </div>
                )}
                {pet?.petGender === true ? '(중성화)' : ''}
              </Grid>
              <Grid container size={12}>
                <h3>나이</h3> {pet?.age}살
              </Grid>
              <Grid container size={12}>
                <h3>특징</h3> {pet?.description}
              </Grid>
            </Grid>
            {/* 지도 */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Card
                sx={{
                  width: '100%',
                  height: { xs: '15vh', sm: '34vh' },
                  background: ' #fff',
                  borderRadius: '20px',
                  boxShadow: '3px 3px 3px rgb(177, 177, 177)',
                }}
              >
                <PostMap lostLocation={pet?.lostLocation || {}} />
                <Box
                  id="loc"
                  sx={{ display: 'flex', alignItems: 'center', mt: 1, marginLeft: '10px' }}
                >
                  <MapPin strokeWidth={2.75} color="#436850" />
                  <h3>실종 당시 위치 </h3>
                  {pet?.lostLocation.number_address}
                </Box>
              </Card>
            </Grid>
          </Grid>
          {/* 댓글 */}
          <Grid
            size={12}
            sx={{
              width: '82vw',
              height: { sx: '', md: '32vh' },
              paddingBottom: '10px',
              background: ' #fff',
              borderRadius: '20px',
            }}
          >
            <PostComment comments={comments || []} postId={id} postType={'missing'} />
          </Grid>
        </Box>
      </Grid>

      {/* 제보하기 모달 */}
      <ReportModal showModal={reportModal} setShowModal={setReportModal} missingId={pet?.id} />
    </Grid>
  );
};

export default MissingDetailPage;
