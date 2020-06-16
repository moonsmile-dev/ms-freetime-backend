interface IJobHandler {
  run: (job: any) => any;
}

class JobHandler implements IJobHandler {
  self = () => {
    return this;
  };
  run = async (job: any) => {
    try {
      await job();
    } catch (error) {
      console.log(`Job is terminated: ${error}`);
    }

    return self;
  };
}

export { JobHandler, IJobHandler };
