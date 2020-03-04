export default {
  form: {
    data: {
      name: 'guessForm'
    },
    style: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      width: [1],
      zIndex: 20
    }
  },
  inputs: [
    {
      data: {
        type: 'select',
        name: 'player',
        label: 'player',
        initialValue: '',
        required: true,
        inputData: {
          display: 'name',
          value: 'id',
          options: [
            { id: 21, name: 'Kanye West' },
            { id: 12, name: 'kid cudi' },
            { id: 33, name: 'asap rocky' }
          ]
        }
      },
      fieldStyle: {
        width: '75%',
        height: '5rem',
        justifyContent: 'space-between',
        flexDirection: 'column'
      },
      inputStyle: {
        background: 'white',
        color: 'black',
        border: '3px solid red',
        borderRadius: '1em',
        minHeight: '2.5em'
      }
    },
    {
      data: {
        type: 'password',
        name: 'guess',
        label: 'guess',
        placeholder: 'enter guess A, B, C, D',
        initialValue: '',
        required: true
      },
      fieldStyle: {
        width: [1],
        height: ['15%'],
        justifyContent: 'space-between',
        flexDirection: 'column'
      },
      inputStyle: {
        themeStyle: 'inputMain'
      }
    }
  ],
  buttons: [
    {
      text: 'Submit',
      type: 'submit',
      cb: null,
      style: {
        themeStyle: 'buttonSmall',
        mr: [3]
      }
    },
    {
      text: 'Cancel',
      type: 'cancel',
      cb: null,
      style: {
        themeStyle: 'buttonSmall'
      }
    }
  ]
};
