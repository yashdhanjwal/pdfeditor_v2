type Task = () => Promise<any>;

class ConversionQueue {
  private queue: { task: Task; resolve: (val: any) => void; reject: (reason: any) => void }[] = [];
  private maxConcurrent = 2;
  private activeCount = 0;

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }

  private async process() {
    if (this.activeCount >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    const item = this.queue.shift();
    if (item) {
      this.activeCount++;
      const { task, resolve, reject } = item;
      try {
        const result = await task();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        this.activeCount--;
        this.process();
      }
    }
  }
}

export const conversionQueue = new ConversionQueue();
