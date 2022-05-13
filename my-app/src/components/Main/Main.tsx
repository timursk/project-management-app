import {
  Grid,
  IconButton,
  InputBase,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import boardsApi from '../../services/boardsService';
import BoardCard from '../BoardCard/BoardCard';
import Loader from '../Loader/Loader';
import { StyledGridItem, StyledGrid, StyledAddCircleIcon } from './styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTNiNjY4NS00OTA0LTRlNGMtYWM5MS00MGRjNjBhN2JlZTkiLCJsb2dpbiI6InRlc3QiLCJpYXQiOjE2NTIyNjg3NzF9.z3z283PgbUDkcblzNR-SZO01qW68dRPGWQxLy-X_ydQ';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 30px 60px rgba(32, 56, 85, 0.15);
  border-radius: 8px;
  padding: 12px 32px 12px 24px;
  height: 50px;
  margin: 15px 0;
`;

{
  /* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Typography variant="h2">{`${t('main.header')}`}</Typography>

  <IconButton size="large" onClick={() => {}}>
    <AccountCircle sx={{ width: 40, height: 40 }} />
  </IconButton>
</div>; */
}

const Main: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isError, isLoading, error } = boardsApi.useGetAllBoardsQuery({ token });
  const [createBoard, {}] = boardsApi.useCreateBoardMutation();

  const handleAdd = () => {
    const title = prompt();
    createBoard({ token, title });
  };

  useEffect(() => {
    if (isError && 'status' in error && error.status === 401) {
      alert('Token has expired! Redirecting...');
      navigate('/Welcome');
    }
  }, [error, isError, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <StyledDiv>
        <div style={{ display: 'flex', flex: '7 1' }}>
          <Typography sx={{ mr: 5 }} variant="h6">{`${t('main.header')}`}</Typography>
          {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
          <div style={{ position: 'relative', width: '100%' }}>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                background: '#F4F7FC',
                borderRadius: '200px',
                width: '100%',
                paddingLeft: '45px',
                paddingRight: '15px',
              }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search google maps' }}
            />

            <IconButton
              type="submit"
              sx={{
                p: '10px',
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
              }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <div style={{ flex: '3 1', display: 'flex', flexDirection: 'row-reverse' }}>
          <IconButton size="large" onClick={() => {}}>
            <AccountCircle sx={{ width: 40, height: 40 }} />
          </IconButton>
        </div>
      </StyledDiv>

      <StyledGrid container spacing={4}>
        {data &&
          data.map(({ id, title }) => {
            return (
              <Grid key={id} item xs={12} sm={6} md={4}>
                <BoardCard id={id} title={title} />
              </Grid>
            );
          })}
        <StyledGridItem item xs={12} sm={6} md={4}>
          <Tooltip title={t('main.add')} placement="left" TransitionComponent={Zoom}>
            <IconButton onClick={handleAdd}>
              <StyledAddCircleIcon sx={{ width: 80, height: 80 }} />
            </IconButton>
          </Tooltip>
        </StyledGridItem>
      </StyledGrid>
    </>
  );
};

export default Main;
