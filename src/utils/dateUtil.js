import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

export default {
    formatDate: (date, format='DD/MM/YY') => {
        return moment(date).format(format);
    }
}