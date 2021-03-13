import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'VUTTR API - Very Useful Tools to Remember',
    description: '',
    version: '1.0.0',
    contact: {
      name: 'Fernando Tomio',
      email: 'nandotomio@gmail.com',
      url: 'https://www.linkedin.com/in/fernando-tomio'
    },
    license: {
      name: 'MIT',
      url: 'https://choosealicense.com/licenses/mit/'
    }
  },
  externalDocs: {
    description: 'Code Repository',
    url: 'https://github.com/nandotomio/vuttr-api'
  },
  servers: [{
    url: '/api',
    description: 'Primary API Service Route'
  }],
  tags: [{
    name: 'Account',
    description: 'User account creation and authentication routes'
  }],
  paths,
  schemas,
  components
}
