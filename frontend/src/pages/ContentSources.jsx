import useUserAgentsStore from '../store/userAgents';
import M3UsTable from '../components/tables/M3UsTable';
import EPGsTable from '../components/tables/EPGsTable';
import { Box, Stack } from '@mantine/core';
import ErrorBoundary from '../components/ErrorBoundary';

const PageContent = () => {
  const error = useUserAgentsStore((state) => state.error);
  if (error) throw new Error(error);

  return (
    <Box h={'100dvh'} w={'100%'} display={'flex'} flexDirection={'column'} style={{ overflow: 'hidden' }}>
      <Box p={10} w={'100%'} style={{ overflow: 'auto', flexGrow: 1 }}>
        <Box miw={'600px'}>
        <M3UsTable />
        </Box>  
      </Box>
    </Box>
  );
};

const M3UPage = () => {
  return (
    <ErrorBoundary>
      <PageContent />
    </ErrorBoundary>
  );
};

export default M3UPage;
