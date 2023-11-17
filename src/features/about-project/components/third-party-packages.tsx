import Link from 'next/link'

/**
 * Get the 3rd-party packages used in this project by reading the `dependencies` field in the `package.json` file.
 */
async function getPackages(): Promise<[string /* package name */, string /* package version */][]> {
  const packageJson = await import('../../../../package.json')

  const dependencies = Object.entries(packageJson.dependencies)
  const devDependencies = Object.entries(packageJson.devDependencies).map(([name, version]) => [
    name,
    `${version} (dev. environment)`,
  ]) as [string, string][]
  const engines = Object.entries(packageJson.engines).map(([name, version]) => [name, `${version} (engine)`]) as [
    string,
    string,
  ][]

  const dependencyEntries = [...dependencies, ...devDependencies, ...engines].sort()

  return dependencyEntries
}

/**
 * The third party packages used in this project.
 */
async function ThirdPartyPackages(): Promise<JSX.Element> {
  const packages = await getPackages()

  return (
    <div className='my-8 flex flex-wrap gap-3'>
      {packages.map(([packageName, packageVersion]) => (
        <Link
          href={`https://npmjs.com/package/${packageName}`}
          target='_blank'
          key={`${packageName}@${packageVersion}`}
        >
          <span className='font-bold'>{packageName}</span>
          &nbsp;
          <span className='text-gray-400'>{packageVersion}</span>
        </Link>
      ))}
    </div>
  )
}

export default ThirdPartyPackages
