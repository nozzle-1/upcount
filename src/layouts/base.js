import { Component } from 'react'
import { Layout } from 'antd'
import { setupI18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import moment from 'moment'

import Header from '../components/layout/header'
import Navigation from '../components/layout/navigation'
import OrganizationProvider from '../providers/organization'
import frFR from 'antd/lib/locale/fr_FR'
import { ConfigProvider } from 'antd'

export const i18n = setupI18n()
const languages = ['de', 'en', 'es', 'et', 'fi', 'fr', 'nl']

// Base layout
class BaseLayout extends Component {
  state = {
    collapsed: false,
    catalogs: {},
    language: localStorage.getItem('language') || 'en',
  }

  componentDidMount () {
    this.loadLanguage(this.state.language)
  }

  loadLanguage = async language => {
    const catalogs = await import(`@lingui/loader!../locales/${language}/messages.po`)

    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: catalogs,
      },
    }))
    moment.locale('fr')
  }

  setLanguage = async language => {
    await this.loadLanguage(language)
    this.setState({ language })
    localStorage.setItem('language', language)
  }

  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 250)
  }

  render () {
    const { children, location } = this.props
    const { catalogs, language } = this.state

    if (location.pathname === '/') {
      return (
        <ConfigProvider locale={frFR}>
          <I18nProvider i18n={i18n} catalogs={catalogs} language={language}>
            <OrganizationProvider>
              <Layout style={{ minHeight: '100vh' }}>
                <Header
                  backgroundColor={'#f0f2f5'}
                  collapsible={false}
                  organizationSelect={false}
                  logo={true}
                  languages={languages}
                  setLanguage={this.setLanguage}
                />
                {children}
              </Layout>
            </OrganizationProvider>
          </I18nProvider>
        </ConfigProvider>
      )
    } else if (location.pathname.includes('pdf')) {
      return (
        <ConfigProvider locale={frFR}>
          <I18nProvider i18n={i18n} catalogs={catalogs} language={language}>
            {children}
          </I18nProvider>
        </ConfigProvider>
      )
    } else {
      return (
        <ConfigProvider locale={frFR}>
          <I18nProvider i18n={i18n} catalogs={catalogs} language={language}>
            <OrganizationProvider>
              <Layout style={{ minHeight: '100vh' }}>
                <Navigation collapsed={this.state.collapsed} />
                <Layout
                  style={{ marginLeft: this.state.collapsed ? 80 : 200, transition: 'all 0.2s' }}
                >
                  <Header
                    collapsed={this.state.collapsed}
                    onToggl={this.toggleSider}
                    languages={languages}
                    setLanguage={this.setLanguage}
                  />
                  {children}
                </Layout>
              </Layout>
            </OrganizationProvider>
          </I18nProvider>
        </ConfigProvider>
      )
    }
  }
}

export default BaseLayout
