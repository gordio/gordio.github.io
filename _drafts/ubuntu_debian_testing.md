## Install Python 3.6 in Ubuntu or Debian (testing repository)



### Adding default configurations

**`/etc/apt/preferences.d/security.pref`**:
```
Package: *
Pin: release l=Debian-Security
Pin-Priority: 1000
```

**`/etc/apt/preferences.d/stable.pref`**:
```
Package: *
Pin: release a=stable
Pin-Priority: 900
```

**`/etc/apt/preferences.d/testing.pref`**:
```
Package: *
Pin: release a=testing
Pin-Priority: 500
```

**`/etc/apt/preferences.d/unstable.pref`**:
```
Package: *
Pin: release a=unstable
Pin-Priority: 50
```

**`/etc/apt/preferences.d/experimental.pref`**:
```
Package: *
Pin: release a=experimental
Pin-Priority: 1
```


### Adding GPG keys

```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 8B48AD6246925553 # for testing
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 7638D0442B90D010 # for testing
```

### Usage

Just select target release (-t): `apt install -t testing python3.6`
