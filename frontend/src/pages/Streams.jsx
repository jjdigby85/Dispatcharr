import React, { useCallback, useRef } from 'react';
import StreamsTable from '../components/tables/StreamsTable';
import { Box } from '@mantine/core';
import { Allotment } from 'allotment';
import { USER_LEVELS } from '../constants';
import useAuthStore from '../store/auth';
import useLogosStore from '../store/logos';
import useLocalStorage from '../hooks/useLocalStorage';
import ErrorBoundary from '../components/ErrorBoundary';

const PageContent = () => {
  const authUser = useAuthStore((s) => s.user);
  const fetchChannelAssignableLogos = useLogosStore(
    (s) => s.fetchChannelAssignableLogos
  );
  const enableLogoRendering = useLogosStore((s) => s.enableLogoRendering);
  const streamsReady = useRef(false);
  const logosTriggered = useRef(false);

  // Only load logos when BOTH tables are ready
  const tryLoadLogos = useCallback(() => {
    if (
      streamsReady.current &&
      !logosTriggered.current
    ) {
      logosTriggered.current = true;
      // Use requestAnimationFrame to defer logo loading until after browser paint
      // This ensures EPG column is fully rendered before logos start loading
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          enableLogoRendering();
          fetchChannelAssignableLogos();
        });
      });
    }
  }, [fetchChannelAssignableLogos, enableLogoRendering]);

  const handleStreamsReady = useCallback(() => {
    streamsReady.current = true;
    tryLoadLogos();
  }, [tryLoadLogos]);

  if (!authUser.id) return <></>;

  if (authUser.user_level <= USER_LEVELS.STANDARD) {
    handleStreamsReady();
  }

  return (
    <Box h={'100vh'} w={'100%'} display={'flex'} style={{ overflowX: 'auto' }}>
        <Box p={10} miw={'100px'} style={{ overflowX: 'auto' }}>
          <Box w={'100%'}>
            <StreamsTable onReady={handleStreamsReady} />
          </Box>
        </Box>
    </Box>
  );
};

const ChannelsPage = () => {
  return (
    <ErrorBoundary>
      <PageContent />
    </ErrorBoundary>
  );
};

export default ChannelsPage;
