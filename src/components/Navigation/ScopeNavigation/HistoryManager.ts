import { View } from "../../Main/types";
import { Environment, Scope } from "../../common/App/types";

const MAX_STEPS = 15;

export interface HistoryStep {
  scope: Scope;
  environment?: Environment | null;
  tabId: View | null;
}

export interface UpdateStepParams {
  scope?: Scope;
  environment?: Environment | null;
  tabId?: View;
}

export interface HistoryData {
  steps: HistoryStep[];
  currentStepIndex: number;
}

interface Node<T> {
  next: Node<T> | null;
  previous: Node<T> | null;
  value: T;
}

export class HistoryManager {
  private head: Node<HistoryStep> | null = null;
  private tail: Node<HistoryStep> | null = null;

  private current: Node<HistoryStep> | null = null;
  private itemsCount = 0;
  private currentIndex = -1;

  constructor(data?: HistoryData) {
    if (data) {
      this.init(data.steps, data.currentStepIndex);
    }
  }

  push(step: HistoryStep) {
    const newNode: Node<HistoryStep> = {
      value: step,
      previous: null,
      next: null
    };

    if (this.current != this.tail) {
      this.tail = this.current;
      this.itemsCount = this.itemsCount - (this.itemsCount - this.currentIndex);
    }

    if (this.tail) {
      this.tail.next = newNode;
      newNode.previous = this.tail;
    }

    if (!this.head) {
      this.head = newNode;
    }

    this.tail = newNode;
    this.current = newNode;
    this.currentIndex++;

    if (this.itemsCount === MAX_STEPS && this.head?.next) {
      this.head = this.head.next;
    } else {
      this.itemsCount++;
    }
  }

  canMoveBack() {
    if (!this.current?.previous) {
      return false;
    }
    return true;
  }

  back() {
    if (!this.current?.previous) {
      return null;
    }

    this.current = this.current.previous;
    this.currentIndex--;
    return this.getCurrent();
  }

  canMoveForward() {
    if (!this.current?.next) {
      return false;
    }
    return true;
  }

  forward() {
    if (!this.current?.next) {
      return null;
    }

    this.current = this.current.next;
    this.currentIndex++;
    return this.getCurrent();
  }

  getLast() {
    return this.tail?.value;
  }

  getCurrent() {
    return this.current?.value;
  }

  updateCurrent(newValue: UpdateStepParams) {
    if (this.current) {
      this.current.value = { ...this.current.value, ...newValue };
    }
  }

  getHistoryData() {
    const steps = [];
    let step = this.head;
    while (step) {
      steps.push(step.value);
      step = step.next;
    }

    return {
      steps,
      currentStepIndex: this.currentIndex
    };
  }

  private init(steps: HistoryStep[], selectedStep: number) {
    if (!steps.length) {
      return;
    }

    let currentIndex = 0;

    let localCurrent = null;
    do {
      this.push(steps[currentIndex]);

      if (selectedStep === currentIndex) {
        localCurrent = this.current;
      }

      currentIndex++;
    } while (currentIndex < steps.length);

    this.itemsCount = steps.length;
    this.currentIndex = selectedStep;
    this.current = localCurrent;
  }
}
