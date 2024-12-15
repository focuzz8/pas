export enum PhishingAttemptState {
	CREATED = "created",
	AWAITING = "awaiting",
	TRACKED = "tracked",
	CANCELLED = "cancelled",
}

export function stringToPhishingAttemptState(state: string): PhishingAttemptState | undefined {
	return Object.values(PhishingAttemptState).includes(state as PhishingAttemptState) ? (state as PhishingAttemptState) : undefined;
}

export function phishingAttemptStateToString(state: PhishingAttemptState): string | undefined {
	return Object.keys(PhishingAttemptState).find((key) => PhishingAttemptState[key as keyof typeof PhishingAttemptState] === state);
}

export class PhishingAttemptStateMachine {
	private currentState: PhishingAttemptState;

	constructor(initialState: PhishingAttemptState) {
		this.currentState = initialState;
	}

	public getState(): PhishingAttemptState {
		return this.currentState;
	}

	public transitionTo(state: PhishingAttemptState): boolean {
		switch (this.currentState) {
			case PhishingAttemptState.CREATED:
				if (state === PhishingAttemptState.AWAITING || state === PhishingAttemptState.CANCELLED) {
					this.currentState = state;
					return true;
				}
				break;
			case PhishingAttemptState.AWAITING:
				if (state === PhishingAttemptState.TRACKED || state === PhishingAttemptState.CANCELLED) {
					this.currentState = state;
					return true;
				}
				break;
			case PhishingAttemptState.TRACKED:
				return false;
			case PhishingAttemptState.CANCELLED:
				return false;
		}
		return false;
	}
}
