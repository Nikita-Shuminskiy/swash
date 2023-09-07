import takeYourThingsImg from '../../../assets/Images/orders/takeThings.png'
import takeYourThingsFromImg from '../../../assets/Images/orders/takeThingsFrom.png'
import paymentRedImg from '../../../assets/Images/orders/payment-red.png'
import waitingImg from '../../../assets/Images/orders/waiting.png'
import { Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'
import { LastStep } from '../../../api/Client/type'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { dateStringFormat } from '../../../utils/commonUtils'


export function getLastStepStatusOrder(lastStep, date_esimated: string) {
	switch (lastStep) {
		case LastStep.executor_perfomed:
			return {
				img: takeYourThingsImg,
				text: <Text color={colors.orangeVivid}>Take your things to Paczkomat</Text>,
			}
		case LastStep.client_must_get:
			return {
				img: takeYourThingsFromImg,
				text: <Text color={colors.greenBright}>Take the things from the Paczkomat</Text>,
			}
		case LastStep.executor_confirm_client_must_pay:
			return {
				img: paymentRedImg,
				text: <Text color={colors.red}>Payment required</Text>,
			}

		case LastStep.executor_done_client_must_pay:
		case LastStep.auction_open:
		case LastStep.client_received:
		case LastStep.client_sent:
		case LastStep.executor_received:
		case LastStep.executor_confirm:
		case LastStep.executor_done:
		case LastStep.executor_must_get:
		case LastStep.executor_sent:
			return {
				img: takeYourThingsFromImg,
				text: <Text color={colors.greenBright}>Will be ready {dateStringFormat('dd MMMM yyyy', date_esimated)}</Text>,
			}
		case LastStep.admin_closed_order:
		case LastStep.client_confirm:
			return {} // не показывать
		default:
			return {
				img: waitingImg,
				text: <Text color={colors.grayLight}>Waiting for the continuation</Text>,
			}
	}
}
